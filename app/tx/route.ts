import { abi, baseSepoliaAddress, publicClient } from "@/constants";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData, parseEther, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

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

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  const { result } = await publicClient.simulateContract({
    address: baseSepoliaAddress,
    abi: abi,
    functionName: "createGiftCard",
    args: [address, Number(amt), false],
    account,
  });

  console.log("result", result);

  if (type === "eth") {
    return NextResponse.json({
      chainId: `eip155:${baseSepolia.id}`,
      method: "eth_sendTransaction",
      params: {
        abi: abi as Abi,
        to: baseSepoliaAddress as `0x${string}`,
        data: calldata,
        value: amt.toString(),
      },
    });
  }

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: abi as Abi,
      to: baseSepoliaAddress as `0x${string}`,
      data: calldata,
    },
  });
}
