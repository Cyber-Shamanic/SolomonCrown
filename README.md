# SolomonCrown (SC) — כתר חכמת שלמה

תאריך: 2026-11-06 · כ״ו בחשוון ה׳תשפ״ז · מהדורה v0.0.2

**יצירה, עריכה וזהות מותג:** לאון יעקובוב (AnLoMinus) · Cyber Shamanic.

## מה יש בפרויקט

- 44 ליקוטים מקוריים של „סור מרע ועשה טוב”, מאורגנים ל־11 נושאים.
- 10 קלפי חכמה עם חזית וגב רעיוניים ותרגול מעשי; נכסים גרפיים נפרדים בתיקיית assets.
- תוכנית ספר לימוד: 8 שערים ו־24 פרקים ראשוניים.
- שער הסברה על בית המקדש הראשון לפי פרקי מלכים.
- עמוד נפרד `spirits.html` עם כל 72 השמות בתעתיק עברי, לצד מקור לטיני, תיאור, אופי סמלי, תחומים ודרך לימוד.
- גלריית נכסים ובה 25 איורים מקוריים נפרדים: סטיקרים שקופים, לוגואים, אייקונים, מסגרות, באנרים, לחצנים ורקע.
- אתר RTL סטטי ללא תלות בספריות JavaScript חיצוניות.
- נגישות, סינון וחיפוש, היסטוריית גרסאות, יומן משימות והדפסה.

## שימוש מקומי

פתח שרת סטטי מהתיקייה `dist` או העלה אותה לשירות אירוח סטטי. טעינת `CHANGELOG.md` ו־`TODO.md` דורשת הגשה באמצעות HTTP(S), ולא פתיחת `file://` ישירה.

להפעלה לדוגמה: `python3 -m http.server 8080 --directory dist`.

## מבנה

- `dist/index.html` — אתר ראשי.
- `dist/spirits.html` — עמוד ע״ב הרוחות.
- `dist/data.js` — מאגרי טקסט ומיפוי תארים.
- `dist/main.js`, `dist/gallery-v002.js`, `dist/spirits-v002.js` — לוגיקה.
- `dist/spirits-he.js` — מאגר 72 השמות בעברית וביאורים.
- `dist/assets-v002.js` — תיאור 25 הנכסים הגרפיים העצמאיים.
- `dist/styles.css`, `dist/spirits.css`, `dist/v002.css` — עיצוב.
- `dist/assets/` — איורים מקוריים עצמאיים.
- `dist/CHANGELOG.md`, `dist/TODO.md` — מסמכי ניהול גרסאות ומשימות.
- `dist/BOOK_V1_HE.md` — טיוטת ספר לימוד.
- `content/SC_SPIRITS_72_DETAILED_HE.md` — כל 72 הרשומות מפורטות בעברית.
- `scripts/prepare-assets-v002.mjs`, `scripts/export-v002.mjs` — הכנת נכסים וייצוא חומרי המחקר.
- `content/` — יצואי תוכן בפורמט Markdown.

## הבחנה בין מקורות

המקרא מספר על מלכות שלמה, בקשתו לחכמה ובניין המקדש; רשימת 72 הרוחות אינה חלק מהתנ״ך. „צוואת שלמה” היא פסאודו־אפיגרף; „מפתח שלמה הקטן” הוא גרימואר מאוחר. חומרי סור מרע ועשה טוב הם פרשנות חדשה המיועדת ללימוד ולתיקון המידות.

## מקורות עיקריים

- [מלכים א׳, פרק ג׳ — ספריא](https://www.sefaria.org/I_Kings.3?lang=he)
- [Lemegeton / Goetia — מהדורת Joseph H. Peterson](https://www.esotericarchives.com/solomon/goetia.htm)
- [רשימת 72 השמות, מהדורת Mathers–Crowley 1904](https://webeditions.page/works/the-lesser-key-of-solomon-goetia/008-classified-list-of-the-72-chief-spirits/)
- [Testament of Solomon — תרגום Conybeare 1898](https://www2.esotericarchives.com/solomon/testamen.htm)

## פרטי יוצר

לאון יעקובוב (AnLoMinus), Cyber Shamanic.

- [GitHub](https://github.com/Anlominus)
- [LinkedIn](https://www.linkedin.com/in/anlominus/)
- [Facebook](https://www.facebook.com/AnlominusX)
- [CodePen](https://codepen.io/Anlominus)
- [WhatsApp](https://wa.me/972535366687)
- דוא״ל: cybershamanic@gmail.com

**מידות יסוד:** חכמה · בינה · דעת · צדק · משפט · ענווה · שלום (7).

> „כִּי טוֹבָה חָכְמָה מִפְּנִינִים” — משלי ח׳, י״א.
