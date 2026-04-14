import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const calculations = await prisma.calculation.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(calculations);
  } catch (error) {
    console.error("Failed to fetch calculations:", error);
    return NextResponse.json({ error: "Failed to fetch calculations" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { semester, subjects, sgpa, cgpa, total_credits } = body;

    // Basic Validation
    if (!semester || !subjects || sgpa === undefined || total_credits === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const calculation = await prisma.calculation.create({
      data: {
        semester,
        subjects,
        sgpa: Number(sgpa),
        cgpa: Number(cgpa) || 0,
        total_credits: Number(total_credits),
      },
    });

    return NextResponse.json(calculation, { status: 201 });
  } catch (error) {
    console.error("Failed to save calculation:", error);
    return NextResponse.json({ error: "Failed to save calculation" }, { status: 500 });
  }
}
