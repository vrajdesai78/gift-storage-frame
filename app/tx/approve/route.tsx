import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams } = new URL(ctx.request.url);
  const address = searchParams.get("name");

  return {
    image: (
      <div
        tw='flex flex-col h-full w-full items-center justify-center text-5xl font-bold text-slate-200'
        style={{
          background: `url('${process.env.HOST_URL}/bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Bought Filecoin Storage to {address}
      </div>
    ),
    buttons: [
      <Button action='link' target={"https://filecoin-gc.vercel.app"}>
        To Redeem Click Here
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
