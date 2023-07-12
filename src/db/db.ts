import db from './connection'

export interface ContactDraft {
  name: string
  email: string
  phone: string
}

interface Contact extends ContactDraft {
  id: number
}

export async function getTotalContacts() {
  const [{ total }] = await db('contacts').count('* as total')
  return total
}

export async function getAllContacts() {
  return await db('contacts')
    .select('id', 'name', 'email', 'phone', 'created_at')
    .orderBy('created_at', 'desc')
}

export async function getContactById(id: number) {
  return await db('contacts')
    .where('id', id)
    .first('id', 'name', 'email', 'phone')
}

export async function addContact(contact: ContactDraft) {
  return await db('contacts').insert(contact)
}

export async function deleteContact(id: number) {
  return await db('contacts').where('id', id).del()
}

export async function updateContact(contact: Contact) {
  return await db('contacts').where('id', contact.id).update(contact)
}

export async function searchContacts(query: string) {
  return await db('contacts')
    .whereLike('name', `%${query}%`)
    .orWhereLike('email', `%${query}%`)
    .orWhereLike('phone', `%${query}%`)
    .orderBy('created_at', 'desc')
}
