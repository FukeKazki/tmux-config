#!/usr/bin/env deno run -A
export const useCommand = async (cmd: string[]) => {
  const p = Deno.run({
    cmd,
    "stderr": "piped",
    "stdout": "piped",
  });

  const [status, stdout, stderror] = await Promise.all([
    p.status(),
    p.output(),
    p.stderrOutput(),
  ]);

  return {
    status,
    stdout: new TextDecoder().decode(stdout),
    stderror: new TextDecoder().decode(stderror),
  };
};

const { stdout } = await useCommand([
  Deno.env.get("HOME") +
  "/Develop/github.com/FukeKazki/raycast-scripts/youtube-music-title.applescript",
]);

const path = "/Develop/github.com/FukeKazki/tmux-config/memo.txt";
const prevIndex = await Deno.readTextFile(
  `${Deno.env.get("HOME")}${path}`,
);

const strWidth = stdout.length;
const maxWidth = 15;
const current = (parseInt(prevIndex) + 1) % stdout.length; // 先頭から何文字目から表示するか

const mem = stdout + stdout;
const txt = mem.substring(current, current + maxWidth);
console.log(txt);

if (current === strWidth) {
  await Deno.writeTextFile(
    Deno.env.get("HOME") + path,
    (0).toString(),
  );
} else {
  await Deno.writeTextFile(
    Deno.env.get("HOME") + path,
    (current + 1).toString(),
  );
}
