# Yemek Öneri Uygulaması

Bu uygulama, kullanıcıların evlerindeki malzemelere göre yemek tarifleri öneren, tarif paylaşımına olanak sağlayan ve kullanıcıların kendi tariflerini yönetebilecekleri bir platformdur.

## Özellikler

- 🔐 Kullanıcı Kimlik Doğrulama
  - Email/Şifre ile kayıt ve giriş
  - Şifremi unuttum fonksiyonu
  - Profil yönetimi

- 📝 Malzeme Yönetimi
  - Malzeme ekleme, düzenleme ve silme
  - Kategori bazlı organizasyon
  - Stok takibi ve son kullanma tarihi bildirimleri

- 🍳 Tarif Sistemi
  - Mevcut malzemelere göre tarif önerileri
  - Tarif arama ve filtreleme
  - Favori tarifleri kaydetme
  - Tarif paylaşma ve değerlendirme

- 👤 Profil ve Tercihler
  - Diyet tercihleri
  - Mutfak kültürü tercihleri
  - Bildirim ayarları

## Teknolojiler

- Frontend:
  - React.js
  - TypeScript
  - Material-UI
  - React Router
  - Firebase Auth

- Backend:
  - Firebase
  - Cloud Firestore
  - Cloud Storage
  - Cloud Functions

## Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/yourusername/yemek-oneri-app.git
   cd yemek-oneri-app
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun ve Firebase yapılandırmanızı ekleyin:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Uygulamayı başlatın:
   ```bash
   npm start
   ```

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## İletişim

Proje Sahibi - [@yourusername](https://twitter.com/yourusername)

Proje Linki: [https://github.com/yourusername/yemek-oneri-app](https://github.com/yourusername/yemek-oneri-app)
