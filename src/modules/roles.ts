const VIP           = 500;
const PRIMARY_VIP   = 600;
const HELPER        = 700;
const MODER         = 800;
const ADMIN         = 900;
const DEV           = 1000;

function hasRights(userRole: number, candidate: number){
    return userRole >= candidate;
}

function getStringNameOfRole(role: number):string {
    switch(role){
        case VIP: { return 'VIP'; }
        case PRIMARY_VIP: { return `Премиум VIP`; }
        case HELPER: { return `Помощник`; }
        case MODER: { return `Модератор`; }
        case ADMIN: { return `Администратор`; }
        case DEV: { return `Разработчик`; }
        default: { return '-'; }
    }
}

export default { VIP, PRIMARY_VIP, HELPER, MODER, ADMIN, DEV, hasRights, getStringNameOfRole }