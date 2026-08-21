import { useFormik } from 'formik'
import React, { useState } from 'react'

const initialData = [
    { id: 1, name: 'ad', job: 'dwa', email: "wad@gmail.com" },
    { id: 2, name: 'dwa', job: 'jbrv', email: "wad@gmail.com" },
    { id: 3, name: 'trb', job: 'awdd', email: "wad@gmail.com" },
]

export default function FormikMain() {
    const [data, setData] = useState(initialData)
    const [idx, setIdx] = useState(null)

    const handleDelete = (id) => {
        setData((item) => item.filter((it) => it.id !== id))
    }

    const { values, handleSubmit, handleChange, setValues } = useFormik({
        initialValues: {
            name: '',
            job: '',
            email: '',
        },
        onSubmit: (values) => {
            if (idx) {
                setData((prev) =>
                    prev.map((e) => e.id === idx ? { ...e, ...values } : e)
                )
                setIdx(null)
                setValues({
                    name: '',
                    job: '',
                    email: '',
                })
            } else {
                setData((prev) => [
                    { ...values, id: Date.now() },
                    ...prev
                ])
                setValues({
                    name: '',
                    job: '',
                    email: '',
                })
            }
        },
    })

    const editUser = (item) => {
        setIdx(item.id)
        setValues({
            name: item.name,
            job: item.job,
            email: item.email,
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="name"
                />
                <input
                    type="text"
                    name="job"
                    value={values.job}
                    onChange={handleChange}
                    placeholder="job"
                />
                <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="email"
                />
                <button type="submit">{idx ? "edit" : "submit"}</button>
            </form>

            <div className="">
                {data.map((item) => {
                    return (
                        <div key={item.id} className="">
                            <p>{item.name}</p>
                            <p>{item.job}</p>
                            <p>{item.email}</p>
                            <button onClick={() => handleDelete(item.id)}>
                                delete
                            </button>
                            <button onClick={() => editUser(item)}>
                                edit
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}