import { TimeType } from '@/types';

export const getwinner = (object: TimeType[]) => (object.length > 0 ? object[0].gamertag : '');
