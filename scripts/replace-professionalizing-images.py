from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "profissionalizantes"

PHOTOS = [
    ("cuidador-idoso.webp", 29372727, "elderly-caregiver-assisting-senior-woman-at-home-29372727"),
    ("auxiliar-financeiro.webp", 8297080, "a-woman-working-in-the-office-8297080"),
    ("auxiliar-rh.webp", 6964119, "preparing-documents-inside-the-office-6964119"),
    ("auxiliar-administrativo.webp", 20552572, "a-calculator-on-a-desk-20552572"),
    ("auxiliar-enfermagem.webp", 8460412, "nurse-with-a-patient-8460412"),
    ("agente-vigilancia.webp", 29941468, "two-female-nurses-smiling-in-hospital-setting-29941468"),
    ("auxiliar-farmacia-manipulacao.webp", 19471014, "woman-working-in-a-laboratory-19471014"),
    ("supervisao-orientacao.webp", 8423020, "a-teacher-and-students-inside-a-classroom-8423020"),
    ("libras.webp", 13181131, "kindergarten-kids-performing-in-front-of-a-teacher-inside-classroom-13181131"),
    ("gestao-orientacao.webp", 8419196, "teacher-and-students-in-classroom-8419196"),
    ("psicomotricidade.webp", 35745583, "teacher-and-student-engaged-in-learning-session-35745583"),
    ("metodologias-ativas.webp", 35745582, "teacher-helping-student-with-homework-in-classroom-35745582"),
    ("psicomotricidade-educacao-especial.webp", 5905921, "smart-kids-studying-with-teacher-in-classroom-5905921"),
    ("transtornos-aprendizagem.webp", 8617951, "teacher-looking-at-a-student-s-work-8617951"),
    ("educacao-inclusiva.webp", 18870251, "teacher-with-two-students-18870251"),
    ("educacao-inclusiva-diversidade.webp", 8617971, "teacher-with-students-in-classroom-8617971"),
    ("alfabetizacao-letramento.webp", 8617967, "teacher-and-students-in-the-classroom-8617967"),
    ("psicopedagogia-escolar.webp", 6929213, "teacher-discussing-her-lesson-with-her-student-6929213"),
    ("neuroeducacao.webp", 8851633, "chemist-working-at-laboratory-8851633"),
    ("educacao-infantil.webp", 18506737, "teacher-and-children-in-classroom-18506737"),
    ("programacao.webp", 7988086, "a-person-doing-computer-programming-7988086"),
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
