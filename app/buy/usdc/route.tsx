import { Button } from "frames.js/next";
import { frames } from "../../frames/frames";
import { normalize } from "viem/ens";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const handleRequest = frames(async (ctx) => {
  let name = new URL(ctx.request.url).searchParams.get("name");

  if (!name) {
    name = ctx.message?.inputText as string;
  }

  const ethPublicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const resolvedAddress = await ethPublicClient.getEnsAddress({
    name: normalize(name as string),
  });

  return {
    image: (
      <div tw='flex flex-col h-full w-full items-center justify-center text-6xl font-bold text-slate-200 bg-blue-900'>
        Buying Filecoin Storage for
        <div tw='text-4xl mt-6 font-bold text-slate-200'>{name}</div>
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx?address=${resolvedAddress}&type=usdc`}
        post_url={`${process.env.HOST_URL}/tx/approve?name=${name}`}
      >
        Buy Filecoin Storage
      </Button>,
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/usdc?address=${resolvedAddress}`}
        post_url={`${process.env.HOST_URL}/buy/usdc?name=${name}`}
      >
        Approve USDC
      </Button>,
    ],
    textInput: "Enter Amount in USDC",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
