ออกแบบ RESTful API
ตัวอย่างเป็น API ใช้งานข้อมูล User โดยจะเรียกผ่าน  HTTP Method แต่ละตัวไปยัง Path ดังต่อไปนี้

1. GET /api/users ขอข้อมูล users ทั้งหมด
2. GET /api/users/:id ขอข้อมูลเฉพาะ user id ที่ส่งเข้ามา
3. POST /api/users เพิ่ม user
4. PUT /api/users/:id แก้ไขข้อมูลเฉพาะ user id ที่ส่งเข้ามา
5. DELETE /api/users/:id ลบข้อมูลเฉพาะ user id ที่ส่งเข้ามา