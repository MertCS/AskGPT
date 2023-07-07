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
                'Hemen Sohbet Etmeye Başla!' : 'Start Chatting!'
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
                'Hemen Sohbet Etmeye Başla!' : 'Hemen Sohbet Etmeye Başla!'
            }
        }
    },
    fallbackLng: 'tr',
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