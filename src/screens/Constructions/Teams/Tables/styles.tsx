import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  headerTableContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  toolbarButton: {
    color: "#0076be",
    border: "1px solid #0076be",
    borderRadius: "4px",
  },
  tableTitleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  tableTitle: {
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 18,
    color: "#2E3132",
  },
  line: {
    flex: 1,
    height: 1,
    marginLeft: 16,
    backgroundColor: "#C5C7C8",
  },
  noDataText: {
    fontSize: 16,
    fontFamily: "Open Sans",
    color: "#C5C7C8",
    textAlign: "center",
    margin: "30px 0",
  },
  tableContainer: {
    // paddingLeft: 12,
    // paddingRight: 12,
  },
}));
