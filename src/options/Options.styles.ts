import {styled} from "baseui";

export const StyledLayout = styled("div", ({ $theme }) => ({
    height: "100%",
    backgroundColor: $theme.colors.backgroundPrimary,
    color: $theme.colors.contentPrimary,
    paddingTop: "1rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    boxSizing: "border-box",
}));

export const StyledContainer = styled("div", ({ $theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    height: "100%",
}));

export const StyledHeader = styled("div", {
    display: "flex",
    flexDirection:"column",
});

export const StyledHeaderTitle = styled("h2", ({ $theme }) => ({
    color: $theme.colors.contentPrimary,
    fontSize: "1.5rem",
    fontWeight: "bold",
    letterSpacing: "-0.025em",
    lineHeight: "0",
}));

export const StyledHeaderDescription = styled("p", ({ $theme }) => ({
    color: $theme.colors.contentSecondary,
    lineHeight: "0",
}));

export const StyledContent = styled("div", {
    display: "flex",
    marginBottom: "1rem",
    width: "100%"
});

export const StyledContentAside = styled("aside", {
    marginLeft: "-1rem",
    marginRight: "-1rem",
    width: "270px",
})

export const StyledSidebar = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    gap: "0.5rem",
});

export const StyledContentArea = styled("div", {
    width: "40%",
    paddingLeft:"4rem"
});

export const Separator = styled("div", ({ $theme }) => ({
    width: "100%",
    height: "1px",
    backgroundColor: $theme.colors.backgroundTertiary,
    marginTop: "1rem",
    marginBottom: "1rem",
}));