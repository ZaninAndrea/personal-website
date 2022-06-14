import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { getSideProjects } from "../lib/graphcms"
import type { SideProject } from "../lib/graphcms"
import PageLayout from "../components/PageLayout"
import styles from "../styles/AboutMe.module.css"

const AboutMe: NextPage = ({
    sideProjects,
}: {
    sideProjects?: SideProject[]
}) => {
    return (
        <PageLayout title="Baida | About Me">
            <div className={styles.sideProjectsList}>
                <h1>My side-projects</h1>
                {sideProjects?.map((project) => (
                    <div className={styles.sideProject}>
                        <b>{project.name}</b>
                        <br /> {project.description}
                        <br />
                        <div className={styles.links}>
                            {project.links.map((link) => (
                                <a href={link.url}>{link.name}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    )
}

export async function getStaticProps() {
    return {
        props: { sideProjects: await getSideProjects() },
    }
}

export default AboutMe
