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

import { siteConfig, SiteConfig } from "@/config/site"
import { currentYear } from "@/lib/utils"

interface EmailTemplateProps {
  userEmail: string
  resetPasswordToken: string
}

const formattedDate = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "medium",
})

export const ForgotPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userEmail,
  resetPasswordToken,
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
          <Section style={logo}>
            <Img width={250} src={""} />
          </Section>

          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionBorder} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi,</Text>
            <Text style={paragraph}>
              You requested to update your password for your{" "}
              {siteConfig.businessName} account {userEmail}. If this was not
              you, please contact us immeadiately at {siteConfig.supportEmail}
            </Text>
            <Text style={paragraph}>
              However if you did request this password change, please click on
              the following link to{" "}
              <Link
                href={`${process.env.URL}/auth/password-reset-verification?token=${resetPasswordToken}`}
                style={link}
              >
                reset your account password
              </Link>{" "}
              immediately. This token is valid for 24 hours.
            </Text>
            <Text style={paragraph}>
              Remember to use a password that is both strong and unique to your
              Build Software account.
            </Text>
            <Text style={paragraph}>
              Still have questions? Please contact{" "}
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
