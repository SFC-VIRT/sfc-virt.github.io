import {
    Highlight,
    Link,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react"
import * as React from "react"
import publications from "./data/publications.json"
import {normalized_members as members} from "./data/members"
import {AiOutlineLink} from "react-icons/ai"

const style: {[key: string]: React.CSSProperties} = {
    iconEnd: {
        display: "inline-block",
        marginLeft: "0.2rem",
    },
}

const createRules = () => {
    let rules: string[] = []
    // Aaa Bbb
    rules = rules.concat(members.faculties.map((e) => e.name))
    rules = rules.concat(members.faculties.map((e) => e.name_en))
    rules = rules.concat(members.students.map((e) => e.name))
    rules = rules.concat(members.students.map((e) => e.name_en))
    // AaaBbb
    rules = rules.concat(
        members.faculties.map((e) => e.name.replace(/\s+/g, ""))
    )
    rules = rules.concat(
        members.faculties.map((e) => e.name_en.replace(/\s+/g, ""))
    )
    rules = rules.concat(
        members.students.map((e) => e.name.replace(/\s+/g, ""))
    )
    rules = rules.concat(
        members.students.map((e) => e.name_en.replace(/\s+/g, ""))
    )
    // Aaa BBB
    rules = rules.concat(
        members.faculties.map((e) => {
            const splitted = e.name_en.split(" ")
            return splitted[0] + splitted[1].toUpperCase()
        })
    )
    rules = rules.concat(
        members.students.map((e) => {
            const splitted = e.name_en.split(" ")
            return splitted[0] + splitted[1].toUpperCase()
        })
    )
    return rules
}


export const Publications = (props: {en: boolean}) => {
    const rules: string[] = createRules()
    const allEntries = [
        ...publications.papers,
        ...publications.presentations,
        ...publications.activities,
    ]

    const allList = allEntries.map((element, index) => (
        <ListItem key={index}>
            {element.url ? (
                <Link href={element.url}>
                    <Highlight
                        query={rules}
                        styles={{
                            px: "0.5",
                            py: "0.5",
                            bg: "orange.100",
                        }}
                    >
                        {props.en ? element.en : element.ja}
                    </Highlight>
                    <AiOutlineLink style={style.iconEnd}></AiOutlineLink>
                </Link>
            ) : (
                <Highlight
                    query={rules}
                    styles={{
                        px: "0.5",
                        py: "0.5",
                        bg: "orange.100",
                    }}
                >
                    {props.en ? element.en : element.ja}
                </Highlight>
            )}
        </ListItem>
    ))

    return <UnorderedList>{allList}</UnorderedList>
}
