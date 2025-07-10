import Swal from "sweetalert2";

const MixinAlert = (
  type: "error" | "warning" | "info" | "success",
  pesan: string
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: type,
    title: pesan,
  });
};

const ConfirmAlert = async (
  text: string,
  icon: "error" | "warning" | "info" | "success"
) => {
  const response = await Swal.fire({
    title: "Apakah kamu yakin?",
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Lanjutkan!",
  });

  return response.isConfirmed;
};

const BoxAlert = (
  title: string,
  text: string,
  icon: "error" | "warning" | "info" | "success"
) => {
  Swal.fire({
    title,
    text,
    icon,
  });
};

export { MixinAlert, ConfirmAlert, BoxAlert };
