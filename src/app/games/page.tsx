import Link from "next/link";
import RacingWarmup from "@/app/games/racing-warmup";
import "./game-corner.css";

export default function GameCornerPage() {
  return (
    <main className="worksGameCorner">
      <div className="worksGameCornerInner">
        <Link className="worksGameCornerBack" href="/">← Back to THE WORKS</Link>
        <header className="worksGameCornerHeader">
          <span>THE WORKS · OPTIONAL EXTRA</span>
          <h1>Game Corner</h1>
          <p>A little racing break, separate from browsing, requests and your customer account.</p>
        </header>
        <section className="worksGameCornerPlay" aria-label="Racing game">
          <RacingWarmup rewardEnabled={false} />
        </section>
        <footer className="worksGameCornerFooter">Just for fun. No purchases, points or rewards are attached to the game.</footer>
      </div>
    </main>
  );
}
