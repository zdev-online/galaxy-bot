const USER          = 0;
const VIP           = 1;
const PRIMARY_VIP   = 2;
const HELPER        = 97;
const MODER         = 98;
const ADMIN         = 99;
const DEV           = 100;

function hasRights(userRole: number, candidate: number){
    return userRole >= candidate;
}

export default { VIP, PRIMARY_VIP, HELPER, MODER, ADMIN, DEV, hasRights }