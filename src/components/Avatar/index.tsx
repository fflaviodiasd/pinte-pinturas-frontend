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

export function BackgroundAvatar({ avatarName }: { avatarName: string }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(avatarName)} />
    </Stack>
  );
}