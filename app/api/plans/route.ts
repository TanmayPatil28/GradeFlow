import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { current_cgpa, target_cgpa, completed_semesters, remaining_semesters, required_gpa, plan_data } = body;

    if (
      current_cgpa === undefined ||
      target_cgpa === undefined ||
      completed_semesters === undefined ||
      remaining_semesters === undefined ||
      required_gpa === undefined ||
      !plan_data
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const plan = await prisma.plan.create({
      data: {
        current_cgpa: Number(current_cgpa),
        target_cgpa: Number(target_cgpa),
        completed_semesters: Number(completed_semesters),
        remaining_semesters: Number(remaining_semesters),
        required_gpa: Number(required_gpa),
        plan_data,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Failed to save plan:", error);
    return NextResponse.json({ error: "Failed to save plan" }, { status: 500 });
  }
}
