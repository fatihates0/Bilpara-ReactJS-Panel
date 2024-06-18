import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '~/redux/slices/authSlice';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUser(false))
        // Çıkış işlemleri burada yapılır
        console.log("Çıkış işlemleri yapıldı.");
        
        // Örneğin, token veya kullanıcı bilgilerini yerel depodan silin
        // localStorage.removeItem('token');

        // Çıkış işlemlerinden sonra giriş sayfasına yönlendirin
        navigate('/auth'); // '/auth' veya giriş sayfasının yolunu kullanın
    }, [navigate]);

    return null; // Bu bileşen herhangi bir şey render etmez
}
