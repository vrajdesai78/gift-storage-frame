import { abi, baseContractAddress } from "@/constants";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData, parseUnits } from "viem";
import { base } from "viem/chains";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const type = searchParams.get("type");

  console.log("type", type);

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  const amt = parseUnits(
    frameMessage.inputText?.toString() ?? "1",
    type === "usdc" ? 6 : 18
  );

  const calldata = encodeFunctionData({
    abi: abi,
    functionName: "createGiftCard",
    args: [address, Number(amt), type === "usdc" ? false : true],
  });

  if (type === "eth") {
    return NextResponse.json({
      chainId: `eip155:${base.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: abi as Abi,
        to: baseContractAddress as `0x${string}`,
        data: calldata,
        value: amt.toString(),
      },
    });
  }

  return NextResponse.json({
    chainId: `eip155:${base.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: abi as Abi,
      to: baseContractAddress as `0x${string}`,
      data: calldata,
    },
  });
}
