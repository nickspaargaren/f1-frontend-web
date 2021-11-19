import { TimeType } from './types';

const getwinner = (object: TimeType[]) => (object.length > 0 && object[0].gamertag);

export default getwinner;
