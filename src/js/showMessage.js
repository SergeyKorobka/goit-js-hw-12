import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  pauseOnHover: true,
  position: 'topRight',
});

export function showMessage(type, message) {
  iziToast[type]({
    message,
  });
}
