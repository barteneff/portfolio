"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Dictionary } from "@/shared/i18n";
import { gsap } from "@/shared/lib/gsap";

type TechGroup = Dictionary["technology"]["groups"][number];

type SimNode = {
  id: string;
  kind: "group" | "item";
  groupId: string;
  el: HTMLElement | null;
  inner: HTMLElement | null;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  mass: number;
  phase: number;
  freq: number;
  active: boolean;
};

const ANCHORS: Record<string, { x: number; y: number }> = {
  core: { x: 22, y: 34 },
  "state-data": { x: 48, y: 28 },
  ui: { x: 72, y: 34 },
  forms: { x: 88, y: 32 },
  architecture: { x: 28, y: 66 },
  web3: { x: 54, y: 62 },
  tooling: { x: 82, y: 66 },
};

const SPRING = 0.055;
const DAMP = 0.8;
const MOUSE_R = 64;
const MOUSE_F = 5.5;
const GAP = 18;
const PAD = 28;

const PILL =
  "glass inline-flex rounded-full px-5 py-3 text-[12px] font-extrabold whitespace-nowrap shadow-[0_8px_24px_rgba(17,17,17,0.06)]";

function anchorFor(id: string, index: number, total: number) {
  if (ANCHORS[id]) return ANCHORS[id];
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + Math.cos(angle) * 34,
    y: 50 + Math.sin(angle) * 22,
  };
}

function itemId(groupId: string, label: string) {
  return `${groupId}::${label}`;
}

function groupEdges(groups: TechGroup[]) {
  const points = groups.map((group, index) => ({
    id: group.id,
    ...anchorFor(group.id, index, groups.length),
  }));
  const seen = new Set<string>();
  const edges: [string, string][] = [];

  for (const point of points) {
    const nearest = points
      .filter((other) => other.id !== point.id)
      .sort((a, b) => {
        const dxA = (a.x - point.x) * 8;
        const dyA = (a.y - point.y) * 3;
        const dxB = (b.x - point.x) * 8;
        const dyB = (b.y - point.y) * 3;
        return dxA * dxA + dyA * dyA - (dxB * dxB + dyB * dyB);
      })
      .slice(0, 2);

    for (const other of nearest) {
      const key = [point.id, other.id].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([point.id, other.id]);
    }
  }

  return edges;
}

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function separate(a: SimNode, b: SimNode, freezeA = false, freezeB = false) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const overlapX = a.w / 2 + b.w / 2 + GAP - Math.abs(dx);
  const overlapY = a.h / 2 + b.h / 2 + GAP - Math.abs(dy);
  if (overlapX <= 0 || overlapY <= 0) return;

  const massA = freezeA ? 0 : 1 / a.mass;
  const massB = freezeB ? 0 : 1 / b.mass;
  const total = massA + massB;
  if (total === 0) return;

  if (overlapX < overlapY) {
    const dir = dx === 0 ? 1 : Math.sign(dx);
    const push = overlapX * dir;
    a.x -= push * (massA / total);
    b.x += push * (massB / total);
    if (!freezeA) a.vx *= 0.65;
    if (!freezeB) b.vx *= 0.65;
    return;
  }

  const dir = dy === 0 ? 1 : Math.sign(dy);
  const push = overlapY * dir;
  a.y -= push * (massA / total);
  b.y += push * (massB / total);
  if (!freezeA) a.vy *= 0.65;
  if (!freezeB) b.vy *= 0.65;
}

function placeOrbit(hub: SimNode, items: SimNode[], width: number, height: number) {
  const rng = mulberry32(hashString(hub.groupId));
  const count = items.length;
  const toCenter = Math.atan2(height / 2 - hub.y, width / 2 - hub.x);
  const cramped =
    hub.x < width * 0.3 ||
    hub.x > width * 0.7 ||
    hub.y < height * 0.36 ||
    hub.y > height * 0.74;
  const spread = cramped ? Math.PI * 1.35 : Math.PI * 2;
  const origin = cramped ? toCenter - spread / 2 : -Math.PI / 2;
  const baseR = Math.min(86 + count * 12, 158);

  items.forEach((item, index) => {
    const jitterA = (rng() - 0.5) * (cramped ? 0.2 : 0.5);
    const jitterR = 0.86 + rng() * 0.28;
    const t = count === 1 ? 0.5 : index / count;
    const angle = origin + t * spread + jitterA;
    const minR = hub.w / 2 + item.w / 2 + 22;
    const radius = Math.max(minR, baseR * jitterR);
    item.homeX = clamp(
      hub.x + Math.cos(angle) * radius * 1.12,
      PAD + item.w / 2,
      width - PAD - item.w / 2,
    );
    item.homeY = clamp(
      hub.y + Math.sin(angle) * radius,
      PAD + item.h / 2,
      height - PAD - item.h / 2,
    );
    item.x = item.homeX;
    item.y = item.homeY;
  });

  const bodies = [hub, ...items];
  for (let pass = 0; pass < 14; pass += 1) {
    for (let i = 0; i < bodies.length; i += 1) {
      for (let j = i + 1; j < bodies.length; j += 1) {
        separate(bodies[i], bodies[j], bodies[i] === hub, bodies[j] === hub);
      }
    }
  }

  items.forEach((item) => {
    item.homeX = clamp(item.x, PAD + item.w / 2, width - PAD - item.w / 2);
    item.homeY = clamp(item.y, PAD + item.h / 2, height - PAD - item.h / 2);
    item.x = hub.x;
    item.y = hub.y;
    item.vx = 0;
    item.vy = 0;
  });
}

export function TechnologyScene({ groups }: { groups: TechGroup[] }) {
  const scene = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Map<string, SimNode>>(new Map());
  const openIdRef = useRef<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, inside: false });
  const [openId, setOpenId] = useState<string | null>(null);

  useLayoutEffect(() => {
    const root = scene.current;
    if (!root) return;

    const nodes = nodesRef.current;
    nodes.clear();

    groups.forEach((group, index) => {
      const phase = index * 0.7;
      nodes.set(group.id, {
        id: group.id,
        kind: "group",
        groupId: group.id,
        el: null,
        inner: null,
        homeX: 0,
        homeY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        w: 120,
        h: 44,
        mass: 2.4,
        phase,
        freq: 0.7 + (index % 3) * 0.15,
        active: true,
      });

      group.items.forEach((label, itemIndex) => {
        const id = itemId(group.id, label);
        nodes.set(id, {
          id,
          kind: "item",
          groupId: group.id,
          el: null,
          inner: null,
          homeX: 0,
          homeY: 0,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          w: 120,
          h: 44,
          mass: 1,
          phase: phase + itemIndex * 0.35,
          freq: 0.9 + (itemIndex % 4) * 0.12,
          active: false,
        });
      });
    });

    const bind = () => {
      root.querySelectorAll<HTMLElement>("[data-node]").forEach((el) => {
        const id = el.dataset.node;
        if (!id) return;
        const node = nodes.get(id);
        if (!node) return;
        node.el = el;
        node.inner = el.querySelector("[data-inner]");
        node.w = el.offsetWidth || node.w;
        node.h = el.offsetHeight || node.h;
      });
    };

    const layoutHomes = () => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      groups.forEach((group, index) => {
        const point = anchorFor(group.id, index, groups.length);
        const node = nodes.get(group.id);
        if (!node) return;
        node.homeX = (point.x / 100) * width;
        node.homeY = (point.y / 100) * height;
        if (node.x === 0 && node.y === 0) {
          node.x = node.homeX;
          node.y = node.homeY;
        }
      });
    };

    bind();
    layoutHomes();
    gsap.set(root.querySelectorAll("[data-kind='item'] [data-inner]"), {
      opacity: 0,
      scale: 0.5,
    });

    const apply = (node: SimNode) => {
      if (!node.el) return;
      node.el.style.transform = `translate(${node.x - node.w / 2}px, ${node.y - node.h / 2}px)`;
    };

    nodes.forEach(apply);

    const observer = new ResizeObserver(() => {
      bind();
      layoutHomes();
    });
    observer.observe(root);

    const activeNodes = () =>
      [...nodes.values()].filter((node) => node.active && node.el);

    let frame = 0;
    const tick = (now: number) => {
      const time = now / 1000;
      const width = root.clientWidth;
      const height = root.clientHeight;
      const mouse = mouseRef.current;
      const bodies = activeNodes();

      for (const node of bodies) {
        const restX = node.homeX + Math.sin(time * node.freq + node.phase) * 7;
        const restY = node.homeY + Math.cos(time * node.freq * 0.86 + node.phase) * 5;
        let ax = (restX - node.x) * SPRING;
        let ay = (restY - node.y) * SPRING;

        if (mouse.inside) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const overNode =
            Math.abs(dx) < node.w / 2 + 8 && Math.abs(dy) < node.h / 2 + 8;
          if (!overNode) {
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < MOUSE_R) {
              const force = (1 - dist / MOUSE_R) ** 2 * MOUSE_F;
              ax += (dx / dist) * force;
              ay += (dy / dist) * force;
            }
          }
        }

        node.vx = (node.vx + ax) * DAMP;
        node.vy = (node.vy + ay) * DAMP;
        node.x += node.vx;
        node.y += node.vy;
        node.x = clamp(node.x, PAD + node.w / 2, width - PAD - node.w / 2);
        node.y = clamp(node.y, PAD + node.h / 2, height - PAD - node.h / 2);
      }

      for (let pass = 0; pass < 4; pass += 1) {
        for (let i = 0; i < bodies.length; i += 1) {
          for (let j = i + 1; j < bodies.length; j += 1) {
            separate(bodies[i], bodies[j]);
          }
        }
      }

      nodes.forEach(apply);

      root.querySelectorAll<SVGLineElement>("[data-group-from]").forEach((line) => {
        const from = nodes.get(line.dataset.groupFrom ?? "");
        const to = nodes.get(line.dataset.groupTo ?? "");
        if (!from || !to) return;
        line.setAttribute("x1", String(from.x));
        line.setAttribute("y1", String(from.y));
        line.setAttribute("x2", String(to.x));
        line.setAttribute("y2", String(to.y));
        line.setAttribute("stroke-opacity", "0.16");
      });

      const open = openIdRef.current;
      root.querySelectorAll<SVGLineElement>("[data-link-from]").forEach((line) => {
        const from = nodes.get(line.dataset.linkFrom ?? "");
        const to = nodes.get(line.dataset.linkTo ?? "");
        const show = Boolean(open && from && to?.active && to.groupId === open);
        if (!from || !to) return;
        line.setAttribute("x1", String(from.x));
        line.setAttribute("y1", String(from.y));
        line.setAttribute("x2", String(to.x));
        line.setAttribute("y2", String(to.y));
        line.setAttribute("stroke-opacity", show ? "0.16" : "0");
      });

      root.querySelectorAll<SVGLineElement>("[data-ring-group]").forEach((line) => {
        const groupId = line.dataset.ringGroup;
        const a = Number(line.dataset.ringA);
        const b = Number(line.dataset.ringB);
        const group = groups.find((item) => item.id === groupId);
        if (!group) return;
        const from = nodes.get(itemId(group.id, group.items[a] ?? ""));
        const to = nodes.get(itemId(group.id, group.items[b] ?? ""));
        const show = Boolean(open && groupId === open && from?.active && to?.active);
        if (!from || !to) return;
        line.setAttribute("x1", String(from.x));
        line.setAttribute("y1", String(from.y));
        line.setAttribute("x2", String(to.x));
        line.setAttribute("y2", String(to.y));
        line.setAttribute("stroke-opacity", show ? "0.1" : "0");
      });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.inside = true;
    };
    const onLeave = () => {
      mouseRef.current.inside = false;
    };

    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [groups]);

  const groupItems = (groupId: string) =>
    [...nodesRef.current.values()].filter(
      (node) => node.kind === "item" && node.groupId === groupId,
    );

  const closeCluster = (groupId: string) => {
    const root = scene.current;
    const hub = nodesRef.current.get(groupId);
    const items = groupItems(groupId);
    if (!hub || !root) return;

    items.forEach((item) => {
      item.homeX = hub.x;
      item.homeY = hub.y;
    });

    gsap.killTweensOf(items.map((item) => item.inner).filter(Boolean));
    if (hub.inner) {
      gsap.to(hub.inner, { scale: 1, duration: 0.28, ease: "power2.out" });
    }
    gsap.to(
      items.map((item) => item.inner),
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.28,
        stagger: 0.015,
        ease: "power2.in",
        onComplete: () => {
          items.forEach((item) => {
            if (openIdRef.current !== groupId) {
              item.active = false;
            }
          });
        },
      },
    );
  };

  const openCluster = (groupId: string) => {
    const root = scene.current;
    const hub = nodesRef.current.get(groupId);
    const items = groupItems(groupId);
    if (!hub || !root) return;

    items.forEach((item) => {
      item.active = true;
      item.w = item.el?.offsetWidth || item.w;
      item.h = item.el?.offsetHeight || item.h;
    });
    hub.w = hub.el?.offsetWidth || hub.w;
    hub.h = hub.el?.offsetHeight || hub.h;

    placeOrbit(hub, items, root.clientWidth, root.clientHeight);

    const inners = items.map((item) => item.inner).filter(Boolean);
    gsap.killTweensOf(inners);
    if (hub.inner) {
      gsap.to(hub.inner, { scale: 0.94, duration: 0.28, ease: "power2.out" });
    }
    gsap.fromTo(
      inners,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.48,
        stagger: 0.03,
        ease: "back.out(1.5)",
      },
    );
  };

  const toggle = (id: string) => {
    const current = openIdRef.current;

    if (current === id) {
      closeCluster(id);
      openIdRef.current = null;
      setOpenId(null);
      return;
    }

    if (current) {
      closeCluster(current);
    }

    openIdRef.current = id;
    setOpenId(id);
    openCluster(id);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const id = openIdRef.current;
      if (!id) return;
      toggle(id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={scene}
      className="relative h-120 overflow-hidden"
      onClick={() => {
        const id = openIdRef.current;
        if (!id) return;
        toggle(id);
      }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {groupEdges(groups).map(([from, to]) => (
          <line
            key={`group-${from}-${to}`}
            data-group-from={from}
            data-group-to={to}
            stroke="rgba(17,17,17,0.7)"
            strokeWidth="1"
            strokeOpacity="0"
          />
        ))}
        {groups.flatMap((group) =>
          group.items.map((label) => (
            <line
              key={`spoke-${group.id}-${label}`}
              data-link-from={group.id}
              data-link-to={itemId(group.id, label)}
              stroke="rgba(17,17,17,0.7)"
              strokeWidth="1"
              strokeOpacity="0"
            />
          )),
        )}
        {groups.flatMap((group) =>
          group.items.map((_, index) => {
            const next = (index + 1) % group.items.length;
            if (group.items.length < 2) return null;
            return (
              <line
                key={`ring-${group.id}-${index}`}
                data-ring-group={group.id}
                data-ring-a={index}
                data-ring-b={next}
                stroke="rgba(17,17,17,0.7)"
                strokeWidth="1"
                strokeOpacity="0"
              />
            );
          }),
        )}
      </svg>

      {groups.map((group) => (
        <div
          key={group.id}
          data-node={group.id}
          data-kind="group"
          className="absolute top-0 left-0 z-20 will-change-transform"
        >
          <button
            type="button"
            data-inner
            aria-expanded={openId === group.id}
            onClick={(event) => {
              event.stopPropagation();
              toggle(group.id);
            }}
            className={`${PILL} tracking-widest uppercase transition-colors hover:bg-white/90`}
          >
            {group.title}
          </button>
        </div>
      ))}

      {groups.flatMap((group) =>
        group.items.map((label) => (
          <div
            key={itemId(group.id, label)}
            data-node={itemId(group.id, label)}
            data-kind="item"
            className="pointer-events-none absolute top-0 left-0 z-10 will-change-transform"
          >
            <span data-inner className={`${PILL} block`}>
              {label}
            </span>
          </div>
        )),
      )}
    </div>
  );
}
