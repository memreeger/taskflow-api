# TaskFlow API

Bu projede ekip içindeki görevleri takip etmek için basit bir REST API geliştirdim. API üzerinden görev eklenebiliyor, görevler listelenebiliyor, tek bir görevin detayı görülebiliyor, görev güncellenebiliyor ve silinebiliyor.

Projeyi Node.js ve Express.js ile hazırladım. Bu aşamada veritabanı kullanmadım; veriler `tasks.json` dosyasında tutuluyor. Böylece önce API, route, controller ve JSON işlemlerini öğrenmeye odaklandım.

## Projede neler var?

- Görev ekleme
- Bütün görevleri listeleme
- ID'ye göre görev getirme
- Görev güncelleme
- Görev silme
- Gelen istekleri konsola yazan basit logger

Kullandığım teknolojiler: Node.js, Express.js, JavaScript, JSON, Nodemon ve Postman.

## Kurulum

Projeyi çalıştırmadan önce bilgisayarda Node.js ve npm kurulu olmalı.

```powershell
git clone https://github.com/memreeger/taskflow-api.git
cd taskflow-api
npm install
```

Projeyi normal şekilde başlatmak için:

```powershell
npm start
```

Kod değiştiğinde sunucunun otomatik yenilenmesini isterseniz:

```powershell
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışır. Görev endpointlerinin başlangıç adresi `http://localhost:3000/api/tasks` şeklindedir.

## Endpointler

| Method | Adres | Yaptığı işlem |
|---|---|---|
| POST | `/api/tasks` | Yeni görev ekler |
| GET | `/api/tasks` | Bütün görevleri getirir |
| GET | `/api/tasks/:id` | ID'ye göre bir görev getirir |
| PUT | `/api/tasks/:id` | Var olan görevi günceller |
| DELETE | `/api/tasks/:id` | Görevi siler |

## Örnek görev ekleme isteği

Postman'de `POST` methodunu seçip `http://localhost:3000/api/tasks` adresine aşağıdaki JSON verisini gönderebilirsiniz:

```json
{
  "title": "Backend projesini tamamla",
  "description": "CRUD işlemlerini yaz ve test et",
  "status": "pending",
  "priority": "high",
  "assignee": "Emre"
}
```

Görev başarılı şekilde eklenirse API `201` durum kodunu ve oluşturulan görevi döndürür. `id`, `createdAt` ve `updatedAt` alanları API tarafından eklenir.

`status` alanı için `pending`, `in-progress` veya `completed`; `priority` alanı için `low`, `medium` veya `high` değerleri kullanılabilir.

## Güncelleme örneği

Bir numaralı görevi tamamlandı olarak işaretlemek için:

```text
PUT http://localhost:3000/api/tasks/1
```

```json
{
  "status": "completed"
}
```

Sadece gönderilen alan değişir. Görevin `updatedAt` alanı da yeni tarihle güncellenir.

## Hata cevapları

- Zorunlu alanlardan biri eksikse `400` döner.
- Girilen ID'ye ait görev yoksa `404` döner.
- Dosya okuma veya yazma sırasında beklenmeyen bir sorun olursa `500` döner.

## Proje yapısı

```text
taskflow-api/
|-- src/
|   |-- controllers/
|   |   `-- taskController.js
|   |-- data/
|   |   `-- tasks.json
|   |-- middleware/
|   |   `-- logger.js
|   |-- routes/
|   |   `-- taskRoutes.js
|   |-- utils/
|   |   `-- fileDb.js
|   `-- app.js
|-- docs/
|   |-- proje-tanitim.md
|   `-- screenshots/
|-- package.json
`-- README.md
```

Dosyaları ayırmamın nedeni her dosyanın tek bir işi yapmasını sağlamak. Route dosyası adresleri tutuyor, controller CRUD işlemlerini yapıyor, `fileDb.js` ise JSON dosyasının okunup yazılmasından sorumlu.

## Logger

Her istek geldiğinde method, adres ve zaman bilgisi terminale yazılır. Örnek çıktı:

```text
[2026-10-14T10:00:00.000Z] GET /api/tasks
```

## Test

Endpointleri Postman ile şu sırayla test ettim:

1. POST ile görev ekleme
2. GET ile bütün görevleri listeleme
3. GET ile tek görev getirme
4. PUT ile görev güncelleme
5. DELETE ile görev silme

Test ekran görüntüleri `docs/screenshots` klasöründedir:

- `post_SS.png`: görev ekleme
- `getAll_SS.png`: bütün görevleri listeleme
- `getById_SS.png`: tek görev getirme
- `updateTask_SS.png`: görev güncelleme
- `deleteTask_SS.png`: görev silme

## Not

Bu projede önce zorunlu olan CRUD, routing ve logger bölümlerini tamamlamaya çalıştım. Filtreleme, arama, sayfalama ve raporlama gibi özellikler şu an projeye dahil değil.
