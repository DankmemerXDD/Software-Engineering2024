import { z } from 'zod';

export const IotDeviceSchema = z.object({
    id: z.string(),
    device_name: z.string().min(1, 'Device name must not be empty'),
    device_status: z.boolean(),
    device_version: z.string().optional(),
    device_description: z.string().optional(),
    device_image: z.string().url().optional(),
  });
  


export type IotDeviceType = z.infer<typeof IotDeviceSchema>;
