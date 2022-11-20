"""
file to pdf
"""
from fpdf import FPDF


def to_pdf(file_extension: str, path: str, new_filename: str):
    """
    convert data to PDF
    """

    if file_extension != "txt":
        return

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=15)

    f = open(path, "r")

    for x in f:
        pdf.cell(200, 10, txt=x, ln=1, align='C')

    pdf.output(f"./pdf/{new_filename}.pdf")
