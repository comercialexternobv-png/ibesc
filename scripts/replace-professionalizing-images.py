from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "profissionalizantes"

PHOTOS = [
    ("cuidador-idoso.webp", 29372742, "elderly-woman-with-caregiver-descending-stairs-in-prague-29372742"),
    ("auxiliar-financeiro.webp", 38759597, "professional-meeting-in-office-setting-38759597"),
    ("auxiliar-rh.webp", 7651935, "a-group-of-people-having-a-meeting-in-the-office-7651935"),
    ("auxiliar-administrativo.webp", 6930300, "people-having-a-meeting-in-the-office-6930300"),
    ("auxiliar-enfermagem.webp", 33776737, "nurse-with-medical-books-and-supplies-33776737"),
    ("auxiliar-farmacia-manipulacao.webp", 8851633, "chemist-working-at-laboratory-8851633"),
    ("supervisao-orientacao.webp", 34526414, "teacher-engaging-students-in-classroom-34526414"),
    ("libras.webp", 13181131, "kindergarten-kids-performing-in-front-of-a-teacher-inside-classroom-13181131"),
    ("gestao-orientacao.webp", 8550845, "people-brainstorming-at-the-office-8550845"),
    ("psicomotricidade.webp", 35745583, "teacher-and-student-engaged-in-learning-session-35745583"),
    ("metodologias-ativas.webp", 36859101, "teacher-interacting-with-students-in-classroom-36859101"),
    ("psicomotricidade-educacao-especial.webp", 35745582, "teacher-helping-student-with-homework-in-classroom-35745582"),
    ("transtornos-aprendizagem.webp", 8617951, "teacher-looking-at-a-student-s-work-8617951"),
    ("educacao-inclusiva.webp", 5905921, "smart-kids-studying-with-teacher-in-classroom-5905921"),
    ("educacao-inclusiva-diversidade.webp", 8617759, "teacher-teaching-in-classroom-8617759"),
    ("alfabetizacao-letramento.webp", 8535177, "children-at-school-reading-a-book-with-a-teacher-8535177"),
    ("psicopedagogia-escolar.webp", 6929213, "teacher-discussing-her-lesson-with-her-student-6929213"),
    ("neuroeducacao.webp", 5905935, "black-teacher-with-smart-kids-in-classroom-5905935"),
    ("educacao-infantil.webp", 5905928, "cheerful-black-teacher-with-children-in-classroom-5905928"),
    ("programacao.webp", 12903294, "brunette-woman-working-on-a-desktop-pc-in-an-office-12903294"),
]


def download(photo_id: int) -> Image.Image:
    url = (
        f"https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg"
        "?auto=compress&cs=tinysrgb&w=1800"
    )
    request = Request(
        url,
        headers={"User-Agent": "Mozilla/5.0", "Referer": "https://www.pexels.com/"},
    )
    with urlopen(request, timeout=45) as response:
        return Image.open(BytesIO(response.read())).convert("RGB")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    credits = [
        "# Fontes das imagens dos cursos profissionalizantes",
        "",
        "Imagens obtidas no Pexels e usadas conforme a licença disponível em "
        "https://www.pexels.com/license/.",
        "",
        "- `agente-vigilancia.webp` — imagem original gerada para o projeto IBESC.",
    ]

    for filename, photo_id, slug in PHOTOS:
        image = download(photo_id)
        image = ImageOps.fit(image, (1200, 675), method=Image.Resampling.LANCZOS)
        image = ImageEnhance.Contrast(image).enhance(1.04)
        image = ImageEnhance.Color(image).enhance(0.96)
        image.save(OUTPUT / filename, "WEBP", quality=88, method=6)
        source = f"https://www.pexels.com/photo/{slug}/"
        credits.append(f"- `{filename}` — {source}")
        print(f"updated {filename}")

    (OUTPUT / "SOURCES.md").write_text("\n".join(credits) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
