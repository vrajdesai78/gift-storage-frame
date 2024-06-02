import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/frames",
});

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div
        tw='flex flex-col h-full w-full items-center justify-center text-6xl font-bold text-slate-200'
        style={{
          background: `url('${process.env.HOST_URL}/bg.png')`,
          backgroundSize: "cover",
        }}
      >
        Buy Filecoin Storage
      </div>
    ),
    buttons: [
      <Button action='post' target={`${process.env.HOST_URL}/buy/eth`}>
        Buy with ETH
      </Button>,
      <Button action='post' target={`${process.env.HOST_URL}/buy/usdc`}>
        Buy with USDC
      </Button>,
    ],
    textInput: "Enter ENS or Address",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
