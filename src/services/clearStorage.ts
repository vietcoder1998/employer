import Cookies from 'universal-cookie';
import Swal from "sweetalert2";

export default async function clearStorage() {
    localStorage.removeItem('ecr');
    localStorage.removeItem('userID');
    localStorage.removeItem('id_candidate');
    let cookies = new Cookies();
    await cookies.remove("actk", { path: "/" });
    await cookies.remove("rftk", { path: "/" });

    Swal.fire({
        title: "Workvns thông báo",
        titleText: "Bạn đã đăng xuất khỏi Worksvn",
        icon: "success",
        onClose: () => {
            localStorage.clear();
            window.location.assign('/');
        }
    })
    setTimeout(() => {
        localStorage.clear();
        window.location.assign('/');
    }, 1000)
}
