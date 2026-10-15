# TaskFlow Proje Tanıtımı

## Projenin amacı

TaskFlow, bir ekipteki işlerin daha kolay takip edilebilmesi için hazırladığım basit bir görev yönetim API'sidir. Bu projedeki amacım Node.js ve Express.js kullanarak REST API yapısını, route kullanımını, CRUD işlemlerini ve middleware mantığını uygulamalı olarak öğrenmekti.

## Proje senaryosu

Bir yazılım ekibinde aynı anda birden fazla görev yürütülebilir. Bu görevlerin ne olduğu, kime verildiği, önceliği ve tamamlanma durumu takip edilmelidir. TaskFlow bu bilgileri tek bir yapı üzerinden yönetir.

Sistemde yeni bir görev oluşturulabilir. Daha önce eklenen bütün görevler listelenebilir veya görev ID'si kullanılarak tek bir görev görüntülenebilir. Görevin durumu ve diğer bilgileri değiştirilebilir. Artık ihtiyaç duyulmayan görevler de sistemden silinebilir.

## Kullanılan teknolojiler

- Node.js
- Express.js
- JavaScript
- JSON
- Nodemon
- Postman

Bu sürümde veritabanı kullanmadım. Görevler `tasks.json` dosyasında saklanmaktadır. Dosya okuma ve yazma işlemleri Node.js'in `fs` modülü ile yapılmaktadır.

## Görev bilgileri

Her görev şu alanlara sahiptir:

- `id`: Görevin sistem tarafından verilen numarası
- `title`: Görevin kısa başlığı
- `description`: Görevin açıklaması
- `status`: Görevin mevcut durumu
- `priority`: Görevin önceliği
- `assignee`: Görevin atandığı kişi
- `createdAt`: Oluşturulma zamanı
- `updatedAt`: Son güncellenme zamanı

Durum alanında `pending`, `in-progress` ve `completed`; öncelik alanında ise `low`, `medium` ve `high` değerleri kullanılabilir.

## API işlemleri

| Method | Endpoint | Açıklama |
|---|---|---|
| POST | `/api/tasks` | Yeni görev oluşturur |
| GET | `/api/tasks` | Bütün görevleri listeler |
| GET | `/api/tasks/:id` | Belirtilen görevi getirir |
| PUT | `/api/tasks/:id` | Görev bilgilerini günceller |
| DELETE | `/api/tasks/:id` | Görevi siler |

## Logger middleware

Projede basit bir logger middleware bulunmaktadır. API'ye gelen her isteğin methodu, adresi ve zamanı terminale yazılır. Böylece hangi endpoint'e ne zaman istek geldiği görülebilir.

## Test süreci

CRUD endpointleri Postman üzerinden sırasıyla görev ekleme, listeleme, detay görüntüleme, güncelleme ve silme işlemleriyle test edildi. Test ekran görüntüleri `docs/screenshots` klasöründe saklanmaktadır.

## Projenin kapsamı

Projenin bu sürümü zorunlu olan görev CRUD işlemlerini, routing yapısını, JSON veri yönetimini ve logger middleware'i içerir. Filtreleme, arama, sayfalama, ayrı validation middleware ve raporlama servisleri isteğe bağlı oldukları için bu sürüme eklenmemiştir.
