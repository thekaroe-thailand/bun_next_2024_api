const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export const RepairRecordController = {
    list: async () => {
        try {
            const repairRecords = await prisma.repairRecord.findMany({
                include: {
                    device: true,
                    user: true
                },
                orderBy: {
                    id: "desc"
                }
            });

            return repairRecords;
        } catch (error) {
            return error;
        }
    },
    create: async ({ body, request, jwt }: {
        body: {
            customerName: string;
            customerPhone: string;
            deviceName: string;
            deviceId?: number;
            deviceBarcode: string;
            deviceSerial?: string;
            problem: string;
            solving?: string;
            expireDate?: Date;
        },
        request: any,
        jwt: any
    }) => {
        try {
            const row = await prisma.repairRecord.create({
                data: body
            });

            return { message: "success", row: row };
        } catch (error) {
            return error;
        }
    },
    update: async ({ body, params }: {
        body: {
            customerName: string;
            customerPhone: string;
            deviceName: string;
            deviceId?: number;
            deviceBarcode: string;
            deviceSerial?: string;
            problem: string;
            solving?: string;
            expireDate?: Date;
        },
        params: { id: string }
    }) => {
        try {
            await prisma.repairRecord.update({
                where: {
                    id: parseInt(params.id)
                },
                data: body
            });

            return { message: "success" };
        } catch (error) {
            return error;
        }
    },
    remove: async ({ params }: {
        params: {
            id: string
        }
    }) => {
        try {
            await prisma.repairRecord.update({
                where: {
                    id: parseInt(params.id)
                },
                data: {
                    status: "inactive"
                }
            });

            return { message: "success" };
        } catch (error) {
            return error;
        }
    },
    upateStatus: async ({ body, params }: {
        body: {
            status: string;
            solving: string;
            engineerId: number;
        },
        params: {
            id: string
        }
    }) => {
        try {
            await prisma.repairRecord.update({
                where: {
                    id: parseInt(params.id)
                },
                data: body
            });

            return { message: "success" };
        } catch (error) {
            return error;
        }
    }
}