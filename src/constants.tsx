@@ .. @@
 export const NAV_LINKS: NavLink[] = [
   { href: "/", label: "Início" },
   { href: "/blog", label: "Blog" },
+  { href: "/cursos", label: "Cursos" },
+  { href: "/admin", label: "Admin" },
   { href: "/anamnese", label: "Avaliação IA" },
 ];
@@ .. @@
 export const WEBHOOK_URL_MAKE_ZAPI = "https://hook.us1.make.com/youruniquewebhookidentifier"; // SUBSTITUA COM SUA URL REAL
+
+// Bunny CDN Configuration
+export const BUNNY_CDN_CONFIG = {
+  STORAGE_ZONE_NAME: process.env.BUNNY_STORAGE_ZONE_NAME || 'your-storage-zone',
+  ACCESS_KEY: process.env.BUNNY_ACCESS_KEY || 'your-access-key',
+  PULL_ZONE_URL: process.env.BUNNY_PULL_ZONE_URL || 'https://your-pull-zone.b-cdn.net',
+  UPLOAD_URL: process.env.BUNNY_UPLOAD_URL || 'https://storage.bunnycdn.com'
+};
+
+// Video Player Configuration
+export const VIDEO_PLAYER_CONFIG = {
+  CONTROLS: true,
+  AUTOPLAY: false,
+  PLAYBACK_RATES: [0.5, 0.75, 1, 1.25, 1.5, 2],
+  QUALITY_LEVELS: ['360p', '480p', '720p', '1080p']
+};