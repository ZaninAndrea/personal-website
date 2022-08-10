import styles from "../styles/Header.module.css"
import Link from "next/link"
import Image from "next/image"
import type { FC } from "react"

const Header: FC<{ titleName?: string; titleLink?: string }> = ({
    titleName,
    titleLink,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">
                    <Image
                        alt="logo"
                        style={{ cursor: "pointer" }}
                        src="/logo.png"
                        width="32"
                        height="32"
                        layout="responsive"
                    />
                </Link>
            </div>
            {titleLink && (
                <div className={styles.title}>
                    <Link href={titleLink}>
                        <a>{titleName}</a>
                    </Link>
                </div>
            )}
            <div className={styles.links}>
                <Link href="/articles">
                    <a className={styles.link}>ARTICLES</a>
                </Link>
                {/* <Link href="/deep-dives">
                    <a className={styles.link}>Deep dives</a>
                </Link> */}
                <Link href="/about-me">
                    <a className={styles.link}>ABOUT ME</a>
                </Link>
            </div>
        </div>
    )
}

export default Header
