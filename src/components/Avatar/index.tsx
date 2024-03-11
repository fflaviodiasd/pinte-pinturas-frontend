import { Settings } from "@mui/icons-material";
import { Badge } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringAvatar(avatarName: string) {
  const initials = avatarName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return {
    sx: {
      bgcolor: "#0076BE",
    },
    children: initials,
  };
}

export function BackgroundAvatar({
  avatarName,
  showBadge = false,
}: {
  avatarName: string;
  showBadge?: boolean;
}) {
  return (
    <Stack direction="row" spacing={2}>
      {showBadge ? (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<Settings />}
        >
          <Avatar {...stringAvatar(avatarName)} />
        </Badge>
      ) : (
        <Avatar {...stringAvatar(avatarName)} />
      )}
    </Stack>
  );
}
