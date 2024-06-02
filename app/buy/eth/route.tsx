import { Button } from "frames.js/next";
import { frames } from "../../frames/frames";
import { normalize } from "viem/ens";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const handleRequest = frames(async (ctx) => {
  const name = ctx.message?.inputText as string;

  const ethPublicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  const resolvedAddress = await ethPublicClient.getEnsAddress({
    name: normalize(name),
  });

  return {
    image: (
      <div
        tw='flex flex-col h-full w-full items-center justify-center text-6xl font-bold text-slate-200 bg-blue-900'
      >
        Buying Filecoin Storage for
        <div tw='text-4xl mt-6 font-bold text-slate-200'>{name}</div>
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx?address=${resolvedAddress}&type=eth`}
        post_url={`${process.env.HOST_URL}/tx/approve?name=${name}`}
      >
        Buy Filecoin Storage
      </Button>,
    ],
    textInput: "Enter Amount in ETH",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
