import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";

const DashboardSidebar = (
  <div>
    <Stack direction="row" gap={1} px={2} py={2} component={Link} href="/">
      <Image src={assets.svgs.logo} alt="brand logo" width={40} height={40} />
      <Typography variant="h6" component="h6">
        PH Health Care
      </Typography>
    </Stack>
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
);

export default DashboardSidebar;
