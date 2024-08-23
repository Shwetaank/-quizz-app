import { Button } from "flowbite-react";
import { FaDownload } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import jsPDF from "jspdf";
import PropTypes from "prop-types";

const DownloadCertificate = ({ score, totalQuestions }) => {
  const { user } = useUser();

  const handleDownloadCertificate = () => {
    const doc = new jsPDF({
      format: "a4",
      orientation: "portrait",
    });

    // Add border to the PDF
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    doc.setLineWidth(1);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Certificate title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Quiz Completion Certificate", pageWidth / 2, 50, {
      align: "center",
    });

    // Participant's name
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("This is to certify that", pageWidth / 2, 80, { align: "center" });
    doc.setFontSize(20);
    doc.text(
      `${user?.firstName || "User"} ${user?.lastName || ""}`,
      pageWidth / 2,
      95,
      { align: "center" }
    );

    // Quiz details
    doc.setFontSize(18);
    doc.text("has successfully completed the", pageWidth / 2, 110, {
      align: "center",
    });
    doc.setFontSize(20);
    doc.text("Quiz on General Knowledge", pageWidth / 2, 125, {
      align: "center",
    });
    doc.text("with the difficulty level: Medium", pageWidth / 2, 140, {
      align: "center",
    });

    doc.setFontSize(18);
    doc.text(
      `scoring ${score} out of ${totalQuestions} (${(
        (score / totalQuestions) *
        100
      ).toFixed(2)}%)`,
      pageWidth / 2,
      155,
      { align: "center" }
    );

    // Motivational Quote
    doc.setFontSize(16);
    doc.text(
      "“The only way to achieve the impossible is to believe it is possible.”",
      pageWidth / 2,
      180,
      { align: "center" }
    );
    doc.setFontSize(14);
    doc.text("— Charles Kingsleigh", pageWidth / 2, 195, { align: "center" });

    // Footer
    doc.setFontSize(14);
    doc.text("Thank you for participating in our quiz!", pageWidth / 2, 230, {
      align: "center",
    });
    doc.text("Keep learning and growing!", pageWidth / 2, 245, {
      align: "center",
    });

    // Save the PDF with user's name
    doc.save(`${user?.firstName || "User"}-quiz-certificate.pdf`);
  };

  return (
    <Button
      onClick={handleDownloadCertificate}
      className="mt-4"
      gradientMonochrome="pink"
      icon={FaDownload}
    >
      Download Certificate
    </Button>
  );
};

DownloadCertificate.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
};

export default DownloadCertificate;
