import Cookies from 'universal-cookie';
import Swal from "sweetalert2";

export default async function clearStorage() {
    localStorage.removeItem('ecr');
    localStorage.removeItem('userID');
    localStorage.removeItem('id_candidate');
    let cookies = new Cookies();
    await cookies.remove("actk", { path: "/" });
    await cookies.remove("rftk", { path: "/" });

    Swal.fire(
        "Workvns thông báo",
        "Bạn đã đăng xuất khỏi Worksvn",
        "success"
    )

    await setTimeout(() => window.location.href = "/login", 2000)
}