export function HeroFallback() {
  return (
    <>
      <div className="absolute h-[300px] w-[430px] -rotate-[24deg] rounded-full border border-black/[0.11] max-[600px]:w-[min(430px,88vw)]" />
      <div
        className="aspect-[0.82] w-[min(390px,75vw)] rotate-[10deg] border border-white/85"
        style={{
          borderRadius: "48% 52% 42% 58% / 42% 46% 54% 58%",
          background:
            "linear-gradient(145deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.18))",
          boxShadow:
            "30px 35px 80px rgba(17, 17, 17, 0.06), inset -22px -18px 40px rgba(255, 44, 168, 0.1), inset 20px 20px 40px rgba(255, 255, 255, 0.7)",
        }}
      />
      <span className="absolute top-[16%] left-[17%] size-[11px] rounded-full bg-pink" />
      <span className="absolute top-[72%] right-[16%] size-[11px] rounded-full bg-cyan" />
      <span className="absolute bottom-[7%] left-[40%] size-[11px] rounded-full bg-orange" />
      <span className="absolute top-[30%] right-[4%] size-[11px] rounded-full bg-purple" />
    </>
  );
}
