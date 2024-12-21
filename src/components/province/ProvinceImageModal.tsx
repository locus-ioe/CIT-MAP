import React from "react";
import { Box, Modal } from "@mui/material";

interface ProvinceImageModalProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ProvinceImageModal: React.FC<ProvinceImageModalProps> = ({
  open,
  imageUrl,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90vw",
          maxWidth: "600px",
          aspectRatio: "16:9",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: 24,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(1.1)",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(15px)",
            zIndex: 1,
          }}
        ></Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <img
            src={imageUrl}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProvinceImageModal;
