const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Docs
 *   description: Döküman yönetimi
 */

// Mock veri (ileride DB'ye taşınacak)
let docs = [
  { id: 1, type: 'help', title: 'Kullanım Kılavuzu', content: 'Uygulama kullanımı hakkında bilgiler...' },
  { id: 2, type: 'faq', title: 'Sıkça Sorulan Sorular', content: 'En çok sorulan sorular ve yanıtları...' },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Doc:
 *       type: object
 *       required:
 *         - id
 *         - type
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: Döküman ID
 *         type:
 *           type: string
 *           description: Döküman tipi
 *         title:
 *           type: string
 *           description: Döküman başlığı
 *         content:
 *           type: string
 *           description: Döküman içeriği
 * 
 * /api/docs:
 *   get:
 *     summary: Get all documents
 *     tags:
 *       - Docs
 *     responses:
 *       200:
 *         description: Documents listed
 *   post:
 *     summary: Yeni döküman ekle
 *     tags:
 *       - Docs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - title
 *               - content
 *             properties:
 *               type:
 *                 type: string
 *                 example: help
 *               title:
 *                 type: string
 *                 example: Yeni Döküman
 *               content:
 *                 type: string
 *                 example: Döküman içeriği...
 *     responses:
 *       201:
 *         description: Döküman başarıyla eklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Döküman eklendi
 *                 doc:
 *                   $ref: '#/components/schemas/Doc'
 */
router.get('/docs', (req, res) => {
  res.json(docs);
});

router.post('/docs', (req, res) => {
  const { type, title, content } = req.body;
  const newDoc = { id: docs.length + 1, type, title, content };
  docs.push(newDoc);
  res.status(201).json({ message: 'Döküman eklendi', doc: newDoc });
});

router.get('/docs/:type', (req, res) => {
  const { type } = req.params;
  const filtered = docs.filter(doc => doc.type === type);
  res.json(filtered);
});

module.exports = router; 