import styles from "../styles/Header.module.css"
import Link from "next/link"
import Image from "next/image"
import type { FC } from "react"

const Header: FC = ({}) => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src="/logo.png"
                    width="32"
                    height="32"
                    layout="responsive"
                />
            </div>
            <div className={styles.links}>
                <Link href="/articles">
                    <a className={styles.link}>Articles</a>
                </Link>
                <Link href="/deep-dives">
                    <a className={styles.link} href="/articles">
                        Deep dives
                    </a>
                </Link>
                <Link href="/projects">
                    <a className={styles.link} href="/articles">
                        Projects
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Header
