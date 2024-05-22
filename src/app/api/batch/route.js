import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();
    if (!prisma.batch) {
      throw new Error("The 'batch' model is not defined in Prisma Client.");
    }

    // const findBatch = await prisma.batch.findMany({
    //   where: { name: body?.name},
    // });

    // if (findBatch) {
    //   return NextResponse.json({
    //     status: "fail",
    //     message: "This branch has been created in this Branch course",
    //   });
    // }

    const result = await prisma.batch.create({
      data: body,
    });

    if (!result) {
      return NextResponse.json({
        status: "fail",
        message: "Batch creation failed",
      });
    }

    return NextResponse.json({
      status: "success",
      data: result,
      message: "Batch successfully created",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "fail", message: error.message });
  }
};

export async function GET(req, res, next) {
  try {
    let { searchParams } = new URL(req.url);
    let course_id = parseFloat(searchParams.get("id"));
    let name = searchParams.get("name") || "";
    const result = await prisma.batch.findMany();

    return NextResponse.json({
      status: "success",
      data: result,
      meassge: " success batch successfully ",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "fail", meassge: error?.meassge });
  }
}




// update batch

export async function PUT(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let id = parseFloat(searchParams.get("id"));
    let reqBody = await req.json();
    const result = await prisma.batch.update({
      where: { id },
      data: reqBody,
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    console.log(error?.message);
    return NextResponse.json({ status: "fail", data: error.toString() });
  }
}
//  delete batch
export async function DELETE(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let id = parseFloat(searchParams.get("id"));
    const findCourse = await prisma.batch.findUnique({
      where: { id },
    });
    if (!findCourse) {
      return NextResponse.json({
        status: "fail",
        data: "batch not found",
      });
    }
    console.log(findCourse)
    const result = await prisma.batch.delete({
      where: { id },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error?.message });
  }
}
