import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// This function is intended for a one-time administrative task.
// It ensures the user 'diegocrisos@gmail.com' exists with the correct password and admin role.
// For security, this function should be deleted after use.

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const adminEmail = 'diegocrisos@gmail.com'
    const newPassword = 'B&rnard0'
    let userId = ''
    let userExisted = false

    // Attempt to create the user first.
    const { data: createData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: newPassword,
        email_confirm: true, // Automatically confirm the email
      })

    if (createError) {
      if (createError.message.includes('User already registered')) {
        userExisted = true
        // User exists, so we need to find their ID to update the password
        let user = null
        let page = 0
        const perPage = 100

        while (true) {
          const {
            data: { users: userBatch },
            error: listError,
          } = await supabaseAdmin.auth.admin.listUsers({
            page: page + 1,
            perPage: perPage,
          })

          if (listError) throw listError

          const foundUser = userBatch.find((u) => u.email === adminEmail)
          if (foundUser) {
            user = foundUser
            break
          }

          if (userBatch.length < perPage) break
          page++
        }

        if (!user) {
          throw new Error(
            `User with email ${adminEmail} exists but could not be retrieved.`,
          )
        }
        userId = user.id

        // Now update the password for the existing user
        const { error: updateError } =
          await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: newPassword,
          })
        if (updateError) throw updateError
      } else {
        // Another error occurred during creation
        throw createError
      }
    } else if (createData.user) {
      // User was created successfully
      userId = createData.user.id
    } else {
      throw new Error('Failed to create or find user.')
    }

    // Now, ensure the user has the 'admin' role in the profiles table.
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', userId)

    if (profileError) {
      // This might happen if the profile doesn't exist. Let's try upserting.
      const { error: upsertError } = await supabaseAdmin
        .from('profiles')
        .upsert({ id: userId, role: 'admin' })

      if (upsertError) throw upsertError
    }

    const message = userExisted
      ? `Password for existing user ${adminEmail} updated and role set to admin.`
      : `User ${adminEmail} created with admin role.`

    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
