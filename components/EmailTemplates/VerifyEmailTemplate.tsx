import * as React from "react"
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

import { siteConfig } from "@/config/site"
import { currentYear } from "@/lib/utils"

interface EmailTemplateProps {
  userName: string
  userEmail: string
  verifyEmailToken: string
}

const formattedDate = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "medium",
})

export const VerifyEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  userEmail,
  verifyEmailToken,
}) => {
  const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif"

  const main = {
    backgroundColor: "#efeef1",
    fontFamily,
  }

  const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
  }

  const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
  }

  const footer = {
    maxWidth: "580px",
    margin: "0 auto",
  }

  const content = {
    padding: "5px 20px 10px 20px",
  }

  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 10,
  }

  const sectionsBorders = {
    width: "100%",
    display: "flex",
  }

  const sectionBorder = {
    borderBottom: "1px solid rgb(255, 136, 0)",
    width: "249px",
  }

  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  }

  const link = {
    textDecoration: "underline",
  }

  return (
    <Html>
      <Head />
      <Preview>
        You forgot the password for your {siteConfig.domainShort} account
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionBorder} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {userName}!</Text>
            <Text style={paragraph}>
              Welcome to the {siteConfig.name}, to verify your email (
              {userEmail}) please click on the link below.
            </Text>
            <Link
              href={`${process.env.URL}/verify-email?token=${verifyEmailToken}`}
              style={link}
            >
              Verify your email
            </Link>{" "}
            <Text style={paragraph}>
              If you did not create an account using this email address, please
              ignore this email.
            </Text>
            <Text style={paragraph}>
              For any further queries please contact{" "}
              <Link href={`mailto:${siteConfig.supportEmail}`} style={link}>
                {siteConfig.businessName} Support
              </Link>
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              {siteConfig.businessName} Support
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              Copyright © {currentYear} {siteConfig.businessName}. All rights
              reserved.
            </Text>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              This is a once off notification that contains important
              information for your attention.
            </Text>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              No unsubscribe option available.
            </Text>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              <Link
                href={`${siteConfig.domain}/termsofservice`}
                target="_blank"
              >
                T&apos;s & C&apos;s
              </Link>{" "}
              |{" "}
              <Link href={`${siteConfig.domain}/privacypolicy`} target="_blank">
                Privacy
              </Link>
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}
