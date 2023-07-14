import i18n, { setDefaultNamespace } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'Kayıt Ol' : 'Sign Up',
                'Şifreler aynı olmalı' : 'Passwords do not match',
                'E-posta' : 'E-mail',
                'E-postanız kimseyle paylaşılmayacaktır.' : 'Your e-mail will not be shared with anyone',
                'İsim' : 'Name',
                'Soyisim' : 'Surname',
                'Kullanıcı Adı' : 'User Name',
                'Şifre' : 'Password',
                'Şifre Yeniden' : 'Password confirmation',
                'Terim ve Koşulları kabul ediyorum' : 'I agree to terms and conditions',
                'Giriş Yap' : 'Log In',
                'Kullanici adi veya şifre hatalı' : 'Incorrect username or password',
                'Kullanıcı Sisteme Başarıyla Kaydedildi': 'User was succesfully created',
                'Çıkış Yap' : 'Log Out',
                'Hemen Sohbet Etmeye Başla!' : 'Start Chatting!',
                'Giriş Yap veya hesabın yoksa kaydol!' : 'Log in or sign up if you dont already have an account',
                'Geçersiz e-posta' : 'Invalid e-mail',
                'İsim uzunluğu 1 ile 255 karakter arasında olmalıdır' : 'Name size must be between 1 and 255 characters',
                'Şifre uzunluğu 8 ile 255 karakter arasında olmalıdır ve en az 1 büyük harf ve bir rakam içermedilir' : 'Password size must be between 8 and 255 characters and must include at least 1 number and at least 1 capital letter',
                'Kullanıcı adı uzunluğu 4 ile 255 karakter arasında olmalıdır' : 'User name size must be between 4 and 255 characters',
                'Gönder' : 'Send',
                'Kullanıcı Bulunamadı' : 'User not found',
                'Yükleniyor...' : 'Loading...',
                'Diğer Kullanıcılar' : 'Users',
                'Sonraki >>' : 'Next >>',
                '<< Önceki' : '<< Previous',
                'Yükleme başarısız' : 'Load failed',
                'Profili Güncelle' : 'Edit Profile',
                'Kaydet': 'Save',
                'İptal' : 'Cancel',
                'Hesabım' : 'My Profile'
            }
        },
        tr: {
            translations:{
                'Kayıt Ol' : 'Kayıt Ol',
                'Şifreler aynı olmalı' : 'Şifreler aynı olmalı',
                'E-posta' : 'E-posta',
                'E-postanız kimseyle paylaşılmayacaktır.' : 'E-postanız kimseyle paylaşılmayacaktır.',
                'İsim' : 'İsim',
                'Soyisim' : 'Soyisim',
                'Kullanıcı Adı' : 'Kullanıcı Adı',
                'Şifre' : 'Şifre',
                'Şifre Yeniden' : 'Şifre Yeniden',
                'Terim ve Koşulları kabul ediyorum' : 'Terim ve Koşulları kabul ediyorum',
                'Giriş Yap' : 'Giriş Yap',
                'Kullanici adi veya şifre hatalı' : 'Kullanici adi veya şifre hatalı',
                'Kullanıcı Sisteme Başarıyla Kaydedildi': 'Kullanıcı Sisteme Başarıyla Kaydedildi',
                'Çıkış Yap' : 'Çıkış Yap',
                'Hemen Sohbet Etmeye Başla!' : 'Hemen Sohbet Etmeye Başla!',
                'Giriş Yap veya hesabın yoksa kaydol!' : 'Giriş Yap veya hesabın yoksa kaydol!',
                'Geçersiz e-posta' : 'Geçersiz e-posta',
                'İsim uzunluğu 1 ile 255 karakter arasında olmalıdır' : 'İsim uzunluğu 1 ile 255 karakter arasında olmalıdır',
                'Şifre uzunluğu 8 ile 255 karakter arasında olmalıdır ve en az 1 büyük harf ve bir rakam içermedilir' : 'Şifre uzunluğu 8 ile 255 karakter arasında olmalıdır ve en az 1 büyük harf ve bir rakam içermedilir',
                'Kullanıcı adı uzunluğu 4 ile 255 karakter arasında olmalıdır' : 'Kullanıcı adı uzunluğu 4 ile 255 karakter arasında olmalıdır',
                'Gönder' : 'Gönder',
                'Kullanıcı Bulunamadı' : 'Kullanıcı Bulunamadı',
                'Yükleniyor...' : 'Yükleniyor...',
                'Diğer Kullanıcılar' : 'Diğer Kullanıcılar',
                'Sonraki >>' : 'Sonraki >>',
                '<< Önceki' : '<< Önceki',
                'Yükleme başarısız' : 'Yükleme başarısız',
                'Profili Güncelle' : 'Profili Güncelle',
                'Kaydet': 'Kaydet',
                'İptal' : 'İptal',
                'Hesabım' : 'Hesabım'
            }
        }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeperator: false,
    interpolation: {
        escapeValue: false,
        formatSeperator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;