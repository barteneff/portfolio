import type { Dictionary } from "@/shared/i18n";

type TechGroup = Dictionary["technology"]["groups"][number];

export function TechGrid({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.id}
            className="rounded-3xl border border-black/8 bg-white p-6.25"
        >
          <h3 className="mb-6.25 text-[11px] font-extrabold tracking-[0.14em] text-muted uppercase">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-full bg-black/4 px-3.5 py-2.5 text-[13px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
