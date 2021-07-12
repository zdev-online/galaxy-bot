const USER          = 0;
const VIP           = 500;
const PRIMARY_VIP   = 600;
const HELPER        = 700;
const MODER         = 800;
const ADMIN         = 900;
const DEV           = 1000;

function hasRights(userRole: number, candidate: number){
    return userRole >= candidate;
}

export default { USER, VIP, PRIMARY_VIP, HELPER, MODER, ADMIN, DEV, hasRights }