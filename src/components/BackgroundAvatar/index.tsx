import { Settings } from "@mui/icons-material";
import { Badge, Avatar, Stack } from "@mui/material";

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
          badgeContent={
            <Settings
              style={{
                color: "#0076BE",
                backgroundColor: "#FFF",
                borderRadius: 50,
              }}
            />
          }
        >
          <Avatar {...stringAvatar(avatarName)} />
        </Badge>
      ) : (
        <Avatar {...stringAvatar(avatarName)} />
      )}
    </Stack>
  );
}
